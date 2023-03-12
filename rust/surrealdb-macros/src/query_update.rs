use std::marker::PhantomData;

use serde::{de::DeserializeOwned, Serialize};
use surrealdb::sql;

use crate::{
    db_field::Binding,
    query_insert::{Buildable, Runnable, Updateables},
    query_relate::{self, Return},
    value_type_wrappers::SurrealId,
    BindingsList, DbFilter, Erroneous, Parametric, SurrealdbModel,
};

pub fn update<T>(targettables: impl Into<Targettable>) -> UpdateStatement<T>
where
    T: Serialize + DeserializeOwned + SurrealdbModel,
{
    // TODO: Pass this to UpdateStatement constructor and gather the errors to be handled when
    // query is run using one of the run methods.
    let table_name = T::table_name();
    let targettables: Targettable = targettables.into();
    if !targettables
        .get_bindings()
        .first()
        .unwrap()
        .get_value()
        .to_raw_string()
        .starts_with(&table_name.to_string())
    {
        panic!("You're trying to update into the wrong table");
    }
    // let errors: String = connection.get_errors();
    let mut builder = UpdateStatement::<T>::new();
    builder.update(targettables)
}

pub struct UpdateStatement<T>
where
    T: Serialize + DeserializeOwned + SurrealdbModel,
{
    target: String,
    content: Option<String>,
    merge: Option<String>,
    set: Vec<String>,
    where_: Option<String>,
    return_type: Option<query_relate::Return>,
    timeout: Option<String>,
    bindings: BindingsList,
    parallel: bool,
    __model_return_type: PhantomData<T>,
}

pub enum Targettable {
    Table(sql::Table),
    SurrealId(SurrealId),
}

impl From<&sql::Table> for Targettable {
    fn from(value: &sql::Table) -> Self {
        Self::Table(value.to_owned())
    }
}
impl From<&sql::Thing> for Targettable {
    fn from(value: &sql::Thing) -> Self {
        Self::SurrealId(value.to_owned().into())
    }
}

impl From<sql::Thing> for Targettable {
    fn from(value: sql::Thing) -> Self {
        Self::SurrealId(value.into())
    }
}

impl From<&SurrealId> for Targettable {
    fn from(value: &SurrealId) -> Self {
        Self::SurrealId(value.to_owned())
    }
}

impl From<SurrealId> for Targettable {
    fn from(value: SurrealId) -> Self {
        Self::SurrealId(value)
    }
}

impl From<sql::Table> for Targettable {
    fn from(value: sql::Table) -> Self {
        Self::Table(value)
    }
}

impl Parametric for Targettable {
    fn get_bindings(&self) -> BindingsList {
        match self {
            Targettable::Table(table) => {
                // Table binding does not seem to work right now. skip it first
                let binding = Binding::new(table.to_owned());
                vec![binding]
            }
            Targettable::SurrealId(id) => vec![Binding::new(id.to_owned())],
        }
    }
}

impl<T> UpdateStatement<T>
where
    T: Serialize + DeserializeOwned + SurrealdbModel,
{
    pub fn new() -> Self {
        Self {
            target: "".into(),
            content: None,
            merge: None,
            set: Vec::new(),
            where_: None,
            return_type: None,
            timeout: None,
            parallel: false,
            bindings: vec![],
            __model_return_type: PhantomData,
        }
    }

    pub fn update(mut self, targettables: impl Into<Targettable>) -> Self {
        let targets: Targettable = targettables.into();
        let targets_bindings = targets.get_bindings();

        let target_names = match targets {
            Targettable::Table(table) => vec![table.to_string()],
            Targettable::SurrealId(_) => targets_bindings
                .iter()
                .map(|b| format!("${}", b.get_param()))
                .collect::<Vec<_>>(),
        };
        self.update_bindings(targets_bindings);
        self.target.extend(target_names);
        self
    }

    pub fn content(mut self, content: T) -> Self {
        let sql_value = sql::json(&serde_json::to_string(&content).unwrap()).unwrap();
        let binding = Binding::new(sql_value);
        self.content = Some(binding.get_param().to_owned());
        self.bindings.push(binding);
        self
    }

    pub fn merge(mut self, merge: impl Serialize) -> Self {
        let sql_value = sql::json(&serde_json::to_string(&merge).unwrap()).unwrap();
        let binding = Binding::new(sql_value);
        self.merge = Some(binding.get_param().to_owned());
        self.bindings.push(binding);
        self
    }

    pub fn set(mut self, settables: impl Into<Updateables>) -> Self {
        let settable: Updateables = settables.into();
        self.bindings.extend(settable.get_bindings());

        let setter_query = match settable {
            Updateables::Updater(up) => vec![up.get_updater_string()],
            Updateables::Updaters(ups) => ups
                .into_iter()
                .map(|u| u.get_updater_string())
                .collect::<Vec<_>>(),
        };
        self.set.extend(setter_query);
        self
    }

    /// Adds a condition to the `` clause of the SQL query.
    ///
    /// # Arguments
    ///
    /// * `condition` - A reference to a filter condition.
    ///
    /// # Example
    ///
    /// ```
    /// use query_builder::{QueryBuilder, DbField, DbFilter};
    ///
    /// let mut builder = QueryBuilder::select();
    /// let condition = DbFilter::from(("age", ">", 18));
    /// builder._(condition);
    ///
    /// assert_eq!(builder.to_string(), "SELECT *  age > 18");
    /// ```
    pub fn where_(mut self, condition: impl Into<DbFilter> + Parametric + Clone) -> Self {
        self.update_bindings(condition.get_bindings());
        let condition: DbFilter = condition.into();
        self.where_ = Some(condition.to_string());
        self
    }

    fn update_bindings(&mut self, bindings: BindingsList) -> &mut Self {
        self.bindings.extend(bindings);
        self
    }

    pub fn return_(mut self, return_type: impl Into<Return>) -> Self {
        let return_type = return_type.into();
        self.return_type = Some(return_type);
        self
    }

    /// Sets the timeout duration for the query.
    ///
    /// # Arguments
    ///
    /// * `duration` - a string slice that specifies the timeout duration. It can be expressed in any format that the database driver supports.
    ///
    /// # Examples
    ///
    /// ```
    /// use my_db_client::{Query, QueryBuilder};
    ///
    /// let mut query_builder = QueryBuilder::new();
    /// query_builder.timeout("5s");
    /// ```
    ///
    /// ---
    ///
    /// Indicates that the query should be executed in parallel.
    ///
    /// # Examples
    ///
    /// ```
    /// use my_db_client::{Query, QueryBuilder};
    ///
    /// let mut query_builder = QueryBuilder::new();
    /// query_builder.parallel();
    /// ```
    pub fn timeout(mut self, duration: impl Into<crate::query_select::Duration>) -> Self {
        let duration: crate::query_select::Duration = duration.into();
        let duration = sql::Duration::from(duration);
        self.timeout = Some(duration.to_string());
        self
    }

    /// Indicates that the query should be executed in parallel.
    ///
    /// # Examples
    ///
    /// ```
    /// use my_db_client::{Query, QueryBuilder};
    ///
    /// let mut query_builder = QueryBuilder::new();
    /// query_builder.parallel();
    /// ```
    pub fn parallel(mut self) -> Self {
        self.parallel = true;
        self
    }
}

impl<T> Buildable for UpdateStatement<T>
where
    T: Serialize + DeserializeOwned + SurrealdbModel,
{
    fn build(&self) -> String {
        let mut query = String::new();

        query.push_str("UPDATE ");
        query.push_str(self.target.as_str());

        if let Some(content) = &self.content {
            query.push_str(" CONTENT ");
            query.push_str(&content);
        } else if let Some(merge) = &self.merge {
            query.push_str(" MERGE ");
            query.push_str(merge);
        } else if !self.set.is_empty() {
            query.push_str(" SET ");
            query += "SET ";
            let set_vec = self.set.join(", ");
            query += &set_vec;
            query += " ";
        }

        if let Some(condition) = &self.where_ {
            query.push_str(" WHERE ");
            query.push_str(condition.as_str());
        }

        if let Some(return_type) = &self.return_type {
            query += "RETURN ";
            match return_type {
                Return::None => query += "NONE ",
                Return::Before => query += "BEFORE ",
                Return::After => query += "AFTER ",
                Return::Diff => query += "DIFF ",
                Return::Projections(projections) => {
                    let projections = projections
                        .iter()
                        .map(|p| format!("{}", p))
                        .collect::<Vec<String>>()
                        .join(", ");
                    query += &projections;
                    query += " ";
                }
            }
        }

        if let Some(timeout) = &self.timeout {
            query.push_str(" TIMEOUT ");
            query.push_str(timeout);
        }

        if self.parallel {
            query.push_str(" PARALLEL");
        }

        query
    }
}

impl<T> std::fmt::Display for UpdateStatement<T>
where
    T: Serialize + DeserializeOwned + SurrealdbModel,
{
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_fmt(format_args!("{}", self.build()))
    }
}

impl<T> Parametric for UpdateStatement<T>
where
    T: Serialize + DeserializeOwned + SurrealdbModel,
{
    fn get_bindings(&self) -> crate::BindingsList {
        self.bindings.to_vec()
    }
}

impl<T> Runnable<T> for UpdateStatement<T> where T: Serialize + DeserializeOwned + SurrealdbModel {}
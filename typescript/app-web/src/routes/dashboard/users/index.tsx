import { Outlet } from "@tanstack/react-router";
import { z } from "zod";
import { router } from "../../../router.js";
import { Loader as Spinner } from "@mantine/core";
import { fetchUsers } from "../../../mockTodos.js";
import { usersIndexRoute } from "./users.js";
import { userRoute } from "./user.js";
import { dashboardRoute } from "../index.js";
import { useEffect, useMemo, useState } from "react";

const usersViewSortBy = z.enum(["name", "id", "email"]);
export type UsersViewSortBy = z.infer<typeof usersViewSortBy>;

export const usersRoute = dashboardRoute.createRoute({
	path: "users",
	component: Users,
	loader: async ({ search }) => {
		search;
		return {
			users: await fetchUsers(),
		};
	},
	validateSearch: z.object({
		usersView: z
			.object({
				sortBy: usersViewSortBy.optional(),
				filterBy: z.string().optional(),
			})
			.optional(),
	}).parse,
	preSearchFilters: [
		// Persist (or set as default) the usersView search param
		// while navigating within or to this route (or it's children!)
		(search) => ({
			...search,
			usersView: {
				...search.usersView,
			},
		}),
	],
});

function Users() {
	const {
		loaderData: { users },
		search: { usersView },
		Link,
		MatchRoute,
		navigate,
	} = router.useMatch(usersRoute.id);

	const sortBy = usersView?.sortBy ?? "name";
	const filterBy = usersView?.filterBy;

	const [filterDraft, setFilterDraft] = useState(filterBy ?? "");

	const sortedUsers = useMemo(() => {
		if (!users) {
			return [];
		}

		return sortBy
			? [...users].sort((a, b) => {
					return a[sortBy] > b[sortBy] ? 1 : -1;
			  })
			: users;
	}, [users, sortBy]);

	const filteredUsers = useMemo(() => {
		if (!filterBy) {
			return sortedUsers;
		}

		return sortedUsers.filter((user) =>
			user.name.toLowerCase().includes(filterBy.toLowerCase()),
		);
	}, [sortedUsers, filterBy]);

	const setSortBy = (sortBy: UsersViewSortBy) =>
		navigate({
			search: (old) => {
				return {
					...old,
					usersView: {
						sortBy,
						// filterBy: old.usersView?.filterBy,
					} as typeof old.usersView,
				};
			},
			replace: true,
		});

	useEffect(() => {
		navigate({
			search: (old) => {
				return {
					...old,
					usersView: {
						...old?.usersView,
						filterBy: filterDraft || undefined,
					},
				};
			},
			replace: true,
		});
	}, [filterDraft]);

	return (
		<div className="flex-1 flex">
			<div className="divide-y">
				<div className="py-2 px-3 flex gap-2 items-center bg-gray-100">
					<div>Sort By:</div>
					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as UsersViewSortBy)}
						className="flex-1 border p-1 px-2 rounded"
					>
						{["name", "id", "email"].map((d) => {
							return (
								<option key={d} value={d}>
									{d}
								</option>
							);
						})}
					</select>
				</div>
				<div className="py-2 px-3 flex gap-2 items-center bg-gray-100">
					<div>Filter By:</div>
					<input
						value={filterDraft}
						onChange={(e) => setFilterDraft(e.target.value)}
						placeholder="Search Names..."
						className="min-w-0 flex-1 border p-1 px-2 rounded"
					/>
				</div>
				{filteredUsers?.map((user) => {
					return (
						<div key={user.id}>
							<Link
								to="./:userId"
								params={{
									userId: user.id,
								}}
								className="block py-2 px-3 text-blue-700"
								activeProps={{ className: "font-bold" }}
							>
								<pre className="text-sm">
									{user.name}{" "}
									<MatchRoute
										to={"./:userId"}
										params={{
											userId: user.id,
										}}
										pending={true}
									>
										<Spinner />
									</MatchRoute>
								</pre>
							</Link>
						</div>
					);
				})}
			</div>
			<div className="flex-initial border-l border-gray-200">
				<Outlet />
			</div>
		</div>
	);
}

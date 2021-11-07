#!/bin/sh

# Only shared folders are copied for now cos those are the only ones that should be shared between mobike and app
BASEDIR=$(dirname $0)
SOURCE="$BASEDIR/common/@packages"

########### FRONTEND MAIN  ############################
# Copy shared packages to frontend
DESTINATION_WEB="$BASEDIR/frontend-main/@packages"

rm -rf "$DESTINATION_WEB"
mkdir "$DESTINATION_WEB"
cp -R "$SOURCE/components/shared/." "$DESTINATION_WEB/components"
# cp -R "$SOURCE/components/web/."" "$DESTINATION_WEB/components"

cp -R "$SOURCE/hooks/shared/." "$DESTINATION_WEB/hooks"
# cp -R "$SOURCE/hooks/web/."" "$DESTINATION_WEB/hooks"

cp -R "$SOURCE/utils/shared/." "$DESTINATION_WEB/utils"
# cp -R "$SOURCE/utils/web/."" "$DESTINATION_WEB/utils"


########### MOBILE MAIN  ############################
# Copy shared packages to mobile
DESTINATION_MOBILE="$BASEDIR/mobile-main/@packages"
rm -rf "$DESTINATION_MOBILE"
mkdir "$DESTINATION_MOBILE"
cp -R "$SOURCE/components/shared/." "$DESTINATION_MOBILE/components"
# cp -R "$SOURCE/components/mobile/."" "$DESTINATION_MOBILE/components"

cp -R "$SOURCE/hooks/shared/." "$DESTINATION_MOBILE/hooks"
# cp -R "$SOURCE/hooks/mobile/."" "$DESTINATION_MOBILE/hooks"

cp -R "$SOURCE/utils/shared/." "$DESTINATION_MOBILE/utils"
# cp -R "$SOURCE/utils/mobile/."" "$DESTINATION_MOBILE/utils"

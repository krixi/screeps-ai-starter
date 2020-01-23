#! /bin/bash

set -e

usage()
{
    echo "./upload-to-server <server> <branch>";
    exit 0;
}

if [ $# -lt 2 ]; then
    usage;
fi

server=$1
branch=$2
srcdir="./dist"


echo "Uplopading to screeps"
echo "  server: $server"
echo "  branch: $branch"
npx screeps-api --server "$server" upload --branch "$branch" ${srcdir}/*.js
rv=$?

# and done
exit $rv

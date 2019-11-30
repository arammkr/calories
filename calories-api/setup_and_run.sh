echo "#####################################"
echo "################ API ################"
echo "#####################################"

echo "## Copy env/.env_local to .env ##"
  cp env/.env_local .env

echo "## Run the application ##"

docker-compose up -d --build

echo "## Run migrations ##"

until docker-compose exec api nc -z -v -w30 db 3306
do
  echo "Waiting for database connection..."
  sleep 10
done

docker-compose exec api yarn db:fresh

if [ "$1" == "--withSeed"  ] || [ "$2" == "--withSeed" ]; then
  echo "## Run DB seed ##"
  docker-compose exec api yarn db:seed
fi

echo "## API server have successfully setup and run ##"

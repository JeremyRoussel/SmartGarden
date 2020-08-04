sequelize model:generate --name users --attributes firstName:string,lastName:string,email:string,pwHex:string --force
sleep 2
sequelize model:generate --name plants --attributes plantOwner:integer,plantType:string,plantName:string --force
sleep 2
sequelize model:generate --name data --attributes plantID:integer,humidity:integer,light:integer --force
sequelize model:generate --name users --attributes firstName:string,lastName:string,email:string,pwHex:string

sequelize model:generate --name plants --attributes plantOwner:integer,plantType:string,plantName:string

sequelize model:generate --name data --attributes plantID:integer,humidity:integer,light:integer
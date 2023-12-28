package main

import (
	"coffee-diary.io/models"
	"github.com/labstack/echo/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dsn := "host=localhost user=coffee-diary password=password dbname=coffee-diary port=5433 sslmode=disable"
	db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	db.AutoMigrate(&models.Coffee{}, &models.Brew{}, &models.CoffeeMaker{}, &models.Grinder{})

	e := echo.New()

	app := application{
		db:   db,
		echo: e,
	}
	app.createRoutes()

	e.Logger.Fatal(e.Start(":1323"))
}

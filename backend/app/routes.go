package main

import (
	"coffee-diary.io/handlers"
)

// TODO: central error handling + error handling in handlers
func (app *application) createRoutes() {
	c := handlers.NewContainer(app.db)

	app.echo.GET("/v1/coffee", c.GetCoffees)
	app.echo.POST("/v1/coffee", c.CreateCoffee)
	app.echo.DELETE("/v1/coffee/:id", c.DeleteCoffee)

	app.echo.GET("/v1/brew", c.GetBrews)
	app.echo.POST("/v1/brew", c.CreateBrew)
	app.echo.DELETE("/v1/brew/:id", c.DeleteBrew)

	app.echo.GET("/v1/coffee-maker", c.GetCoffeeMakers)
	app.echo.POST("/v1/coffee-maker", c.CreateCoffeeMaker)
	app.echo.DELETE("/v1/coffee-maker/:id", c.DeleteCoffeeMaker)

	app.echo.GET("/v1/grinder", c.GetGrinders)
	app.echo.POST("/v1/grinder", c.CreateGrinder)
	app.echo.DELETE("/v1/grinder/:id", c.DeleteGrinder)
}

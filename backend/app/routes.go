package main

import (
	"coffee-diary.io/handlers"
)

func (app *application) createRoutes() {
	c := handlers.NewContainer(app.db)

	app.echo.GET("/v1/coffee", c.GetCoffees)
	app.echo.POST("/v1/coffee", c.CreateCoffee)
	app.echo.DELETE("/v1/coffee/:id", c.DeleteCoffee)

	app.echo.GET("/v1/brew", c.GetBrews)
	app.echo.POST("/v1/brew", c.CreateBrew)
	app.echo.DELETE("/v1/brew/:id", c.Deleterew)
}

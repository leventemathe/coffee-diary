package handlers

import (
	"net/http"

	"coffee-diary.io/models"
	"github.com/labstack/echo/v4"
)

func (c *container) GetCoffees(ctx echo.Context) error {
	coffees := []models.Coffee{}
	result := c.db.Find(&coffees)

	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusOK, &coffees)
}

func (c *container) CreateCoffee(ctx echo.Context) error {
	coffee := new(models.Coffee)
	if err := ctx.Bind(coffee); err != nil {
		return err
	}

	// TODO: validation

	result := c.db.Create(coffee)
	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusCreated, coffee)
}

func (c *container) DeleteCoffee(ctx echo.Context) error {
	id := ctx.Param("id")

	result := c.db.Delete(&models.Coffee{}, id)
	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusOK, id)
}

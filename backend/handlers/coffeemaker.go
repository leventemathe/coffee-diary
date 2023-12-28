package handlers

import (
	"net/http"

	"coffee-diary.io/models"
	"github.com/labstack/echo/v4"
)

func (c *container) GetCoffeeMakers(ctx echo.Context) error {
	coffeeMakers := []models.CoffeeMaker{}
	result := c.db.Find(&coffeeMakers)

	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusOK, &coffeeMakers)
}

func (c *container) CreateCoffeeMakers(ctx echo.Context) error {
	coffeeMaker := new(models.CoffeeMaker)
	if err := ctx.Bind(coffeeMaker); err != nil {
		return err
	}

	// TODO: validation

	result := c.db.Create(coffeeMaker)
	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusCreated, coffeeMaker)
}

func (c *container) DeleteCoffeeMakers(ctx echo.Context) error {
	id := ctx.Param("id")

	result := c.db.Delete(&models.CoffeeMaker{}, id)
	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusOK, id)
}

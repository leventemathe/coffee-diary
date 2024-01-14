package handlers

import (
	"net/http"

	"coffee-diary.io/models"
	"github.com/labstack/echo/v4"
)

func (c *container) GetBrews(ctx echo.Context) error {
	brews := []models.Brew{}

	result := c.db.Joins("Coffee").Joins("CoffeeMaker").Joins("Grinder").Find(&brews)
	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusOK, brews)
}

func (c *container) CreateBrew(ctx echo.Context) error {
	brew := new(models.Brew)
	if err := ctx.Bind(brew); err != nil {
		return err
	}

	// TODO: validation

	result := c.db.Create(brew)
	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusCreated, brew)
}

func (c *container) DeleteBrew(ctx echo.Context) error {
	id := ctx.Param("id")

	result := c.db.Delete(&models.Brew{}, id)
	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusOK, id)
}

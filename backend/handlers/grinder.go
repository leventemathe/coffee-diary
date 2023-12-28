package handlers

import (
	"net/http"

	"coffee-diary.io/models"
	"github.com/labstack/echo/v4"
)

func (c *container) GetGrinders(ctx echo.Context) error {
	grinders := []models.Grinder{}
	result := c.db.Find(&grinders)

	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusOK, &grinders)
}

func (c *container) CreateGrinder(ctx echo.Context) error {
	grinder := new(models.Grinder)
	if err := ctx.Bind(grinder); err != nil {
		return err
	}

	// TODO: validation

	result := c.db.Create(grinder)
	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusCreated, grinder)
}

func (c *container) DeleteGrinder(ctx echo.Context) error {
	id := ctx.Param("id")

	result := c.db.Delete(&models.Grinder{}, id)
	if result.Error != nil {
		return result.Error
	}

	return ctx.JSON(http.StatusOK, id)
}

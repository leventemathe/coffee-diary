package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type application struct {
	db   *gorm.DB
	echo *echo.Echo
}

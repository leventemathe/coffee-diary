package models

import (
	"gorm.io/gorm"
)

type Brew struct {
	gorm.Model
	CoffeeID      uint        `gorm:"not null;default:null;index"`
	Coffee        Coffee      `gorm:"not null;default:null"`
	CoffeeMakerID uint        `gorm:"not null;default:null;index"`
	CoffeeMaker   CoffeeMaker `gorm:"not null;default:null"`
}

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
	GrinderID     uint        `gorm:"not null;default:null;index"`
	Grinder       Grinder     `gorm:"not null;default:null"`
	Input         uint
	Output        uint
	Time          uint
	GrindSetting  float32
	Temperature   *float32
	Pressure      *float32
	Preinfustion  *bool
	OtherNotes    *string
}

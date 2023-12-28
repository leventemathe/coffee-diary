package models

import (
	"gorm.io/gorm"
)

type Brew struct {
	gorm.Model
	CoffeeID      uint        `gorm:"not null;default:null;index"`
	Coffee        Coffee      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CoffeeMakerID uint        `gorm:"not null;default:null;index"`
	CoffeeMaker   CoffeeMaker `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	GrinderID     uint        `gorm:"not null;default:null;index"`
	Grinder       Grinder     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Input         uint        `gorm:"not null;default:null"`
	Output        uint        `gorm:"not null;default:null"`
	Time          uint        `gorm:"not null;default:null"`
	GrindSetting  float32     `gorm:"not null;default:null"`
	Temperature   *float32
	Pressure      *float32
	Preinfustion  *bool
	OtherNotes    *string
}

package models

import (
	"gorm.io/gorm"
)

type Brew struct {
	gorm.Model
	CoffeeID uint   `gorm:"not null;default:null"`
	Coffee   Coffee `gorm:"not null;default:null"`
}

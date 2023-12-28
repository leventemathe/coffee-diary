package models

import "gorm.io/gorm"

type Grinder struct {
	gorm.Model
	Name        string `gorm:"not null;default:null;unique"`
	Description *string
}

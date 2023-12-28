package models

import (
	"gorm.io/gorm"
)

type RoastLevel string

const (
	LightRoast  = "light_roast"
	MediumRoast = "medium_roast"
	DarkRoast   = "dark_roast"
)

type RoastProfile string

const (
	Espresso = "espresso"
	Filter   = "filter"
	Moka     = "moka"
)

type Coffee struct {
	gorm.Model
	Name         string `gorm:"not null;default:null"`
	Description  *string
	Region       *string
	RoastLevel   *RoastLevel
	RoastProfile *RoastProfile
}

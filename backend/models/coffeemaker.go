package models

import "gorm.io/gorm"

type CoffeeMakerType string

const (
	EspressoMaker  = "espresso_maker"
	PouroverMaker  = "pourover_maker"
	ImmersionMaker = "immersion_maker"
	DripMaker      = "drip_maker"
	Other          = "other_maker"
)

type CoffeeMaker struct {
	gorm.Model
	Name        string `gorm:"not null;default:null;unique"`
	Description *string
	Type        *CoffeeMakerType
}

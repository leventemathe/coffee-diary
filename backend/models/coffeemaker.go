package models

type CoffeeMakerType string

const (
	EspressoMaker  = "espresso_maker"
	PouroverMaker  = "pourover_maker"
	ImmersionMaker = "immersion_maker"
	DripMaker      = "drip_maker"
	Other          = "other_maker"
)

type CoffeeMaker struct {
	model
	Name        string `gorm:"not null;default:null;unique" json:"name"`
	Description *string `json:"description"`
	Type        *CoffeeMakerType `json:"type"`
}

package models

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
	Model
	Name         string `gorm:"not null;default:null;unique" json:"name"`
	Description  *string `json:"description"`
	Region       *string `json:"region"`
	RoastLevel   *RoastLevel `json:"roastLevel"`
	RoastProfile *RoastProfile `json:"roastProfile"`
}

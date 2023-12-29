package models

type Grinder struct {
	model
	Name        string `gorm:"not null;default:null;unique" json:"name"`
	Description *string `json:"description"`
}

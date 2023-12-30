package models

type Grinder struct {
	Model
	Name        string `gorm:"not null;default:null;unique" json:"name"`
	Description *string `json:"description"`
}

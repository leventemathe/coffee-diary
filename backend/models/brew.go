package models

type Brew struct {
	model
	CoffeeID      uint        `gorm:"not null;default:null;index" json:"coffeeId"`
	Coffee        Coffee      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"coffee"`
	CoffeeMakerID uint        `gorm:"not null;default:null;index" json:"coffeeMakerId"`
	CoffeeMaker   CoffeeMaker `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"coffeeMaker"`
	GrinderID     uint        `gorm:"not null;default:null;index" json:"grinderId"`
	Grinder       Grinder     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"grinder"`
	Input         uint        `gorm:"not null;default:null" json:"input"`
	Output        uint        `gorm:"not null;default:null" json:"output"`
	Time          uint        `gorm:"not null;default:null" json:"time"`
	GrindSetting  float32     `gorm:"not null;default:null" json:"grindSetting"`
	Temperature   *float32 `json:"temperature"`
	Pressure      *float32 `json:"pressure"`
	Preinfustion  *bool `json:"preInfusion"`
	OtherNotes    *string `json:"otherNotes"`
	Rating float32 `json:"rating"`
}

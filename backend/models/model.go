package models

import "time"

type model struct {
		ID          uint       `gorm:"primary_key" json:"id"`
		CreatedAt   time.Time  `json:"createdAt"`
		UpdatedAt   time.Time  `json:"updatedAt"`
		DeletedAt   *time.Time `json:"deletedAt"`
}
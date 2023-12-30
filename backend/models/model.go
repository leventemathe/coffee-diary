package models

import "time"

type Model struct {
	ID          uint       `gorm:"primarykey" json:"id"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
	DeletedAt   *time.Time `json:"deletedAt"`
}
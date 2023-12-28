package handlers

import "gorm.io/gorm"

type container struct {
	db *gorm.DB
}

func NewContainer(db *gorm.DB) container {
	return container{
		db: db,
	}
}

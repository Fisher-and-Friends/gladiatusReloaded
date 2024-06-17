DROP INDEX IF EXISTS `users_name_unique`;--> statement-breakpoint
ALTER TABLE `users` ADD `picture` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `givenName` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `familyName` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `name`;
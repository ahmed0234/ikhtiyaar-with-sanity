CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`seo_title` text NOT NULL,
	`seo_description` text NOT NULL,
	`cover` text NOT NULL,
	`cover_alt` text NOT NULL,
	`blocks` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`published_at` text,
	`revision` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE INDEX `posts_status_published` ON `posts` (`status`,`published_at`);--> statement-breakpoint
CREATE TABLE `blog_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);

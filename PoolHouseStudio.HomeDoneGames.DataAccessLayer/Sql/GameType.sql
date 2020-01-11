CREATE TABLE [dbo].[GameType]
(
	[GameTypeID] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [GameName] VARCHAR(150) NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedDate] DATETIME NOT NULL
)


insert into GameType values ('Never Have I Ever')
insert into GameType values ('Jeopardy')
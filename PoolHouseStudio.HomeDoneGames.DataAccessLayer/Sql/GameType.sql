CREATE TABLE [dbo].[GameType]
(
	[GameTypeID] INT NOT NULL IDENTITY(1,1), 
    [GameName] VARCHAR(150) NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedDate] DATETIME NOT NULL,
	CONSTRAINT PK_GameType PRIMARY KEY (GameTypeID)
)


insert into GameType values ('Never Have I Ever')
insert into GameType values ('Jeopardy')
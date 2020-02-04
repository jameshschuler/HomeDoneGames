CREATE TABLE [dbo].[GameType]
(
	[GameTypeID] INT NOT NULL IDENTITY(1,1), 
    [GameName] VARCHAR(150) NOT NULL,
	[Description] NVARCHAR(MAX) NULL,
	[MinPlayers] INT NOT NULL,
	[MaxPlayers] INT NOT NULL,
	[IsActive] BIT NOT NULL DEFAULT 0,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedDate] DATETIME NOT NULL,
	CONSTRAINT PK_GameType PRIMARY KEY (GameTypeID)
)
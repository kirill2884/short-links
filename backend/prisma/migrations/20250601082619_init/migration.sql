-- CreateTable
CREATE TABLE "ShortLink" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "alias" TEXT NOT NULL,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "shortLinkId" INTEGER NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_originalUrl_key" ON "ShortLink"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_shortUrl_key" ON "ShortLink"("shortUrl");

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_shortLinkId_fkey" FOREIGN KEY ("shortLinkId") REFERENCES "ShortLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_shortLinkId_fkey";

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_shortLinkId_fkey" FOREIGN KEY ("shortLinkId") REFERENCES "ShortLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

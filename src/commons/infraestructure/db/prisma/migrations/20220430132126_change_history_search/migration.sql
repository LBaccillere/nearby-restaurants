/*
  Warnings:

  - You are about to drop the `SearchHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SearchHistory" DROP CONSTRAINT "SearchHistory_user_id_fkey";

-- DropTable
DROP TABLE "SearchHistory";

-- CreateTable
CREATE TABLE "HistorySearch" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "query" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "HistorySearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HistorySearch_uuid_key" ON "HistorySearch"("uuid");

-- AddForeignKey
ALTER TABLE "HistorySearch" ADD CONSTRAINT "HistorySearch_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

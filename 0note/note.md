- Author có thể trùng name
- Category ko đc trùng name


## Việc cần làm:
- Viết table cho import.
- Viết table cho sale
- Viết table cho bill
- Viết table cho statistics


SELECT "import_receipt".*, count("import_receipt_details"."book_id") AS "import_receipt_details.count_details", sum("import_receipt_details"."quantity") AS "import_receipt_details.sum_quantity" FROM (SELECT "import_receipt"."id", "import_receipt"."id" AS "id" FROM "public"."import_receipt" AS "import_receipt" GROUP BY "import_receipt"."id" LIMIT 10 OFFSET 20) AS "import_receipt" LEFT OUTER JOIN "public"."import_receipt_detail" AS "import_receipt_details" ON "import_receipt"."id" = "import_receipt_details"."report_receipt_id";
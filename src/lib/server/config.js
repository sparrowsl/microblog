import "dotenv/config";
import { z } from "zod";

const config_schema = z.object({
  JWT_SECRET_KET: z.string({ message: "JWT_SECRET_KET is missing" }).trim().default("secretkey"),
  DATABASE_URL: z.string({ message: "DATABASE_URL is missing" }).trim(),
});

function check_config() {
  const { success, data, error } = config_schema.safeParse(process.env);

  if (!success) {
    const { fieldErrors } = error.flatten();
    const errors = Object.values(fieldErrors).flat();
    throw new Error(`ERROR: ${errors[0]}`);
  }

  return data;
}

export const config = check_config();

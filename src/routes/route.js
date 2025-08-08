import { Router } from "express";

import { addSchool, listSchool } from "../controller/school.controller.js";

const router = Router();

router.post("/addschool", addSchool);
router.post("/listschool", listSchool);

export default router;

const express = require('express');
const { syncData } = require('../controllers/syncController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @openapi
 * /sync:
 *   post:
 *     tags:
 *       - Sync
 *     summary: Synchronize offline data with the server
 *     description: This is the main endpoint for an offline-first client. It accepts a batch of created, updated, and deleted records from the client's offline queue, processes them, resolves conflicts, and returns the latest server state.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SyncPayload'
 *     responses:
 *       200:
 *         description: Sync process completed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SyncResponse'
 *       401:
 *         description: Not authorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error during the sync process.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', protect, syncData);

module.exports = router;
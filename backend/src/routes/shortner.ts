import { Router, Request, Response } from "express";
import Joi from "joi";
import ShortUrl, { IShortURL } from "../models/shortUrl";

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { fullUrl } = req.body;

    const schema = Joi.object({
        fullUrl: Joi.string().uri().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ err: error.details[0].message, status: false });
    }

    try {
        const createdShortURL: IShortURL = await ShortUrl.create({ fullUrl });

        return res.status(201).json({ message: 'Created Succesfully', data: createdShortURL, status: true });
    } catch (err) {
        res.status(500).json({ err: "Server Error" });
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        const shortUrls: IShortURL[] = await ShortUrl.find().select("fullUrl short clicks createdAt updatedAt");

        return res.status(201).send({ message: 'Fetched Succesfully', data: shortUrls, status: true });
    } catch (err) {
        res.status(500).json({ err: "Server Error" });
    }
})

router.get('/:shortUrl', async (req: Request, res: Response) => {
    const { shortUrl } = req.params;

    const schema = Joi.object({
        shortUrl: Joi.string()
    });

    const { error } = schema.validate(req.params);

    if (error) {
        return res.status(400).json({ err: error.details[0].message, status: false });
    }

    try {
        const shortURL: IShortURL | null = await ShortUrl.findOne({ short: shortUrl })

        if (!shortURL) {
            return res.status(400).json({ err: "Not Found", status: false });
        }

        shortURL.clicks++;
        shortURL.save();

        return res.redirect(shortURL.fullUrl);
    } catch (err) {
        res.status(500).json({ err: "Server Error" });
    }
})

export default router;
import express from 'express';

app.get('/api/ping', (req: Request, res: Response) => {
   res.json({ message: 'Success!' });
});

app.post('/api/chat', chatController.sendMessage);

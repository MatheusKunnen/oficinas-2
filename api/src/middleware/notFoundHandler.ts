import express from 'express';

const notFoundHandler =
  () => (req: express.Request, res: express.Response, next: Function) => {
    return res.status(404).json({
      error: {
        name: 'Page not found',
        message: `Invalid endpoint ${req.method} ${req.path}`,
        cod: 404,
      },
    });
  };
export default notFoundHandler;

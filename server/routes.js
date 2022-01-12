// Import things
const Presentation = require('./Presentation');

exports.authenticate = (req, res) => {

  const [key, code, name] = req.body.code.split("__");

  // Guest Trying To Join
  if (key && (!code && !name)) {

    const presentation = instance.presentation?.validate(key, req.body.key);

    if (presentation) {
      return res.status(200).json({
        status: 'success',
        valid: true,
        ...presentation
      });
    }
  
    return res.status(200).json({
      status: "error",
      valid: false,
      message: "We couldn't find any presentations matching that code"
    });

  }

  // Host Trying to create Session
  if (!key || !code || key !== process.env.HOST_SECRET) {
    return res.status(200).json({
      status: "error",
      valid: false,
      message: "Invalid authentication key"
    });
  }

  // Instantiate new presentation
  instance.presentation = new Presentation(code, name);

  // Return Presentaiton
  res.status(200).json({
    status: "success",
    valid: true,
    message: "Authentication successful",
    presentation: instance.presentation,
    role: "host",
    key: instance.presentation.getHost()
  });

}


exports.validateCode = (req, res) => {

  const presentation = instance.presentation?.validate(req.body.code);

  if (!presentation) {
    return res.status(200).json({
      status: "error",
      valid: false,
      message: "We couldn't find any presentations matching that code"
    });
  }

  res.status(200).json({
    status: 'success',
    valid: true,
    ...presentation
  });

}


exports.endPresentation = (req, res) => {

  if (!instance.presentation) {
    return res.status(200).json({
      status: "error",
      message: "No presentation to end"
    });
  }

  if (!instance.presentation.isHost(req.body.id)) {
    return res.status(200).json({
      status: "error",
      message: "You are not the host of this presentation"
    });
  }

  instance.presentation = undefined;

  res.status(200).json({
    status: 'success',
    message: 'Presentation ended'
  });

}


exports.getPresentation = (req, res) => {
  res.status(200).json({
    status: 'success',
    presentation: instance.presentation
  });
}

exports.redirect = (req, res) => res.redirect('/')
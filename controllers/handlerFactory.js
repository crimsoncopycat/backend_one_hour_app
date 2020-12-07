const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const ApiFeatures = require("./../utils/apiFeatures");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No document found with that id`, 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No tour found with that id`, 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
      console.log(req.body);
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const doc = await query;
    // Tour.findOne({_id : req.params.id});

    if (!doc) {
      return next(new AppError(`No document  found with that id`, 404));
    }

    res.status(200).json({
      status: "success",
      // results: tours.length,
      data: {
        doc,
      },
    });
  });

exports.getLastEntry = (Model) =>
    catchAsync(async (req, res, next) => {
        // db.market.find({}).sort({_id:-1}).limit(1)
        let query = Model.findOne({}).sort({date:-1});
        const doc = await query;
        if (!doc) {
            return next(new AppError(`No document  found with that id`, 404));
        }
        console.log(doc);
        res.status(200).json({
            status: "success",
            // results: tours.length,
            data: {
                doc,
            },
        });
    });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    }

    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitingFields()
      .paginate();

    //EXECUTE QUERY
    // const docs = await features.query.explain();
      console.log(features.query);
    const docs = await features.query;
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

import { NextFunction, Request, Response } from "express";
import features, { IFeature } from "../models/features.model";
import { IUserRole } from "../models/userRole.model";
import { IUser } from "../models/users.model";


const create = async (req: Request, res: Response, next: NextFunction) => {
  const {
    _id,
    title,
    description,
    message,
    tag,
    isDisabled,
    isFeatureSelected,
    isRoleFeature,
  } = req.body as IFeature;

  const loggedUser = res.locals.loggedUser as IUser;

  if (
    (<IUserRole>loggedUser.roleId).features.includes('createFeature')
  ) {
      const createdModel = new features({
        _id: _id,
        title,
        description,
        message,
        isDisabled,
        isFeatureSelected,
        isRoleFeature,
        tag,
        // createdByUserId: loggedUser._id.toString(),
      });
    
      try {
        const result = await createdModel.save();
        // Logging.info(result)
        return res.status(201).json({
          // data: result,
          error: false,
          message: "Feature added successfully.",
        });
      } catch (error: any) {
        console.error(error);
        let message = "Unknown Error!";
        if (!!error["code"]) {
          const idx = error["index"];
          const keys = Object.keys(error["keyValue"]);
          const values = Object.values(error["keyValue"]);
          message =
            error["code"] == 11000
              ? `${keys[idx]} ${values[idx]} already exists`
              : "Unknown Error!";
        }
    
        return res.status(200).json({ error: true, message: message });
      }

  }else{
    return res.status(200).json({
        error: true,
        message: "You Dont have permission.",
      });
  }

};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  let currentPage = 1,
    itemsPerPage = 10;
  let skip = 0;

  const loggedUser = res.locals.loggedUser as IUser;

  let filter = {};

  if (
    (<IUserRole>loggedUser.roleId).features.includes('readFeature')
  ) {
    try {
      if (req.query.currentPage && req.query.itemsPerPage) {
        if (
          !isNaN(Number(req.query.currentPage)) &&
          !isNaN(Number(req.query.itemsPerPage))
        ) {
          currentPage = Number(req.query.currentPage);
          itemsPerPage = Number(req.query.itemsPerPage);
        }

        skip = (currentPage - 1) * itemsPerPage; // Calculate skip based on currentPage number

        const totalCount = await features.countDocuments(filter); // Fetch total count efficiently

        const data = await features.find(filter)
          // .populate({ path: 'orgId', select: { _id: 1, brandName: 1, orgType: 1 } })
          // .populate({
          //   path: "orgManagerId",
          //   select: { _id: 1, brandName: 1, orgType: 1 },
          // })
          .skip(skip)
          .limit(itemsPerPage)
          .exec();

        const totalPages = Math.ceil(totalCount / itemsPerPage);

        return res.status(200).json({
          data: {
            currentPage,
            itemsPerPage,
            data,
            totalCount,
            totalPages,
            hasNext: currentPage < totalPages,
            hasPrev: currentPage > 1,
          },
          error: false,
          message: "UserRoles found",
        });
      } else {
        const data = await features.find(filter);
        return res
          .status(200)
          .json({ data: data, error: false, message: "UserRoles found" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: error, error: true, message: "something went wrong" });
    }
  } else {
    return res.status(200).json({
      error: true,
      message: "You Dont have permission.",
    });
  }
};

const readOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const loggedUser = res.locals.loggedUser as IUser;

  if (
    (<IUserRole>loggedUser.roleId).features.includes('readFeature')
  ) {
    try {
      const data = await features.findById(id);
      return data
        ? res
            .status(201)
            .json({ data: data, error: false, message: "Feature Found" })
        : res.status(200).json({ error: true, message: "Feature not found" });
    } catch (error) {
      console.error(error);
      return res
        .status(200)
        .json({ data: error, error: true, message: "Something Went wrong!" });
    }
  } else {
    return res.status(200).json({
      error: true,
      message: "You Dont have permission.",
    });
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const {
    title,
    description,
    message,
    tag,
    isDisabled,
    isFeatureSelected,
    isRoleFeature,
  } = req.body as IFeature;

  const loggedUser = res.locals.loggedUser as IUser;

  const valuesArray = {
    title,
    description,
    message,
    tag,
    isDisabled,
    isFeatureSelected,
    isRoleFeature,
  };

  if (
    (<IUserRole>loggedUser.roleId).features.includes('editFeature')
  ) {
    var updater: { [key: string]: any } = {};

    for (const [key, value] of Object.entries(valuesArray as IFeature)) {
      if (value != undefined) {
        updater[key] = value;
      }
    }

    try {
      const updatedModel = await features.findByIdAndUpdate(
        { _id: id },
        updater
      );
      return res.status(200).json({
        data: updatedModel,
        error: false,
        message: "Feature updated.",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: error, error: true, message: "Something went wrong" });
    }
  } else {
    return res.status(200).json({
      error: true,
      message: "You Dont have permission.",
    });
  }
};

const updateMany = async (req: Request, res: Response, next: NextFunction) => {
  const { ids } = req.body;
  const { message, isDisabled } = req.body as IFeature;

  const loggedUser = res.locals.loggedUser as IUser;

  if (
    (<IUserRole>loggedUser.roleId).features.includes('editFeature')
  ) {
    const valuesArray = { message, isDisabled };

    var updater: { [key: string]: any } = {};

    for (const [key, value] of Object.entries(valuesArray as IFeature)) {
      if (value != undefined) {
        updater[key] = value;
      }
    }

    try {
      if (Array.isArray(ids) && ids.length > 0) {
        const updatedModel = await features.updateMany(
          { _id: { $in: ids } },
          updater
        );
        return res.status(200).json({
          data: updatedModel,
          error: false,
          message: "Feature updated.",
        });
      } else {
        return res
          .status(500)
          .json({ error: true, message: "ids length must greater than 0" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: error, error: true, message: "Something went wrong" });
    }
  } else {
    return res.status(200).json({
      error: true,
      message: "You Dont have permission.",
    });
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const loggedUser = res.locals.loggedUser as IUser;

  if (
    (<IUserRole>loggedUser.roleId).features.includes('deleteFeature')
  ) {
    try {
        const data = await features.findByIdAndDelete({ _id: id });
        return data
          ? res
              .status(201)
              .json({ data: data, error: false, message: "UserRoles Deleted" })
          : res.status(200).json({ error: true, message: "Feature not found" });
      } catch (error) {
        console.error(error);
        return res
          .status(200)
          .json({ data: error, error: true, message: "Something Went wrong!" });
      }
  } else {
    return res.status(200).json({
      error: true,
      message: "You Dont have permission.",
    });
  }

};

export default { create, readAll, readOne, updateOne, updateMany, deleteOne };

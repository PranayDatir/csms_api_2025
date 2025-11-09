import mongoose from 'mongoose';
import features from '../../models/features.model';
import UserRoles, { IUserRole } from '../../models/userRole.model';
import { Helpers } from '../../functions/helpers';
import usersModel from '../../models/users.model';
import Logging from '../../library/Logging';
import config from '../config/config';

// Connect to MongoDB
mongoose.connect(config.mongo.url
//     , {
//     dbName: config.mongo.dbName,
//     user: config.mongo.username,
//     pass: config.mongo.password,
// }
).then(() => {
    Logging.info('Mongo connected successfully.');
    seedFeatures();
}).catch((error) => Logging.error(error));

export const allFeaturess = [
    {
        _id: 'Admin',
        title: 'Admin Role',
        description: '',
        tag: 'Can Create/Assign',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: true,
    },
    {
        _id: 'createRole',
        title: 'Create Role',
        description: '',
        tag: 'Role',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'readRole',
        title: 'Read Role',
        description: '',
        tag: 'Role',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'editRole',
        title: 'Edit Role',
        description: '',
        tag: 'Role',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'deleteRole',
        title: 'Delete Role',
        description: '',
        tag: 'Role',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'createFeature',
        title: 'Create Feature',
        description: '',
        tag: 'Feature',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'readFeature',
        title: 'Read Feature',
        description: '',
        tag: 'Feature',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'editFeature',
        title: 'Edit Feature',
        description: '',
        tag: 'Feature',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'deleteFeature',
        title: 'Delete Feature',
        description: '',
        tag: 'Feature',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'createUser',
        title: 'Create User',
        description: '',
        tag: 'User',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'readUser',
        title: 'Read User',
        description: '',
        tag: 'User',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'editUser',
        title: 'Edit User',
        description: '',
        tag: 'User',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    },
    {
        _id: 'deleteUser',
        title: 'Delete User',
        description: '',
        tag: 'User',
        isDisabled: false,
        isFeatureSelected: false,
        isRoleFeature: false,
    }
];

const seedFeatures = async () => {
    const featureData = await features.insertMany(allFeaturess);
    console.log('Feature data seeded successfully');
    console.log(featureData);

    if (featureData) {
        const AdminRole: IUserRole = {
            _id: "Admin",
            features: allFeaturess.map((x) => x._id),
            featureId: "Admin"
        };

        const createAdminRole = new UserRoles(AdminRole);
        const adminRoleResult = await createAdminRole.save();

        console.log("adminRoleResult");
        console.log(adminRoleResult);

        const password = "Asdf@#1234";

        if (adminRoleResult) {
            const createUser = new usersModel({
                _id: new mongoose.Types.ObjectId(),
                firstName: "Pranay",
                lastName: "Datir",
                email: "pranay.datir@owner.com",
                mobile: "9158956020",
                gender: "Male",
                isDisabled: false,
                roleId: AdminRole._id,
                password: "",
            });
            const hashedPass = await Helpers.bcryptHash(password, 10);
            if (hashedPass) {
                createUser.password = hashedPass;

                const userResult = await createUser.save();
                console.info(userResult);
            } else {
                console.info(`Hash Error BCRYPTJS`);
            }
        }
    }
};



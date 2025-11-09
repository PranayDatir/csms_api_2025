// import bcrypt from 'bcrypt';
// import Users from '../../models/users.model';
// import connectDb from '../config/database';
// import mongoose from 'mongoose';
// import { Role } from '../../Shared/Constants/userRoles';
// import { Gender } from '../../Shared/Constants/gender';
// import Tickets from '../../models/ticket.model';
// import { TicketStatus } from '../../Shared/Constants/ticketStatus';


// async function seedAdmin() {
//     try {
//         await connectDb();

//         for (let i = 0; i < 100; i++) {
//             const ticketData = {
//                 title: `Ticket ${i}`,
//                 status: TicketStatus.CREATED,
//                 assigned_to_userid: null,
//                 assigned_at: null,
//                 raised_by_email: `ticket${i}@gmail.com`,
//                 raised_by_mobile: `1234198833`,
//                 raised_by_username: 'ABC',
//                 raised_by_role: `${Role.CONSUMER}`,
//                 raised_by_userTypeId: '66b5e1c6401985adac09f7cb',
//                 applicationInterfaceType: 'Web'
//             }
//             const ticket = new Tickets(ticketData);
//             await ticket.save();
//         }
//         console.log('Tickets added created successfully');
//     } catch (error) {
//         console.error('Error creating admin user:', error);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// seedAdmin();

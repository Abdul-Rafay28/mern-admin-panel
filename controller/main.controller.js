import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import productModel from '../models/product.model.js';


export const getUserData = async (req, resp) => {
    try {

        if (req.user.role !== 'admin') {
            return resp.status(403).json({
                message: 'Forbidden!',
                success: false,
            })
        }

        const userData = await userModel.find({role: 'user'}).select('-password');
        resp.status(200).json({
            success: true,
            data: userData,
        });

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const adminUpdatedata = async (req, resp) => {
    try {

        if (req.user.role !== 'admin') {
            return resp.status(403).json({
                message: 'Forbidden!',
                success: false
            })
        }

        const user = await userModel.findById(req.params.id);
        if (!user) {
            return resp.status(404).json({
                message: 'User not found!',
                success: false,
            })
        }

        user.isActive = !user.isActive

        await user.save();

        resp.status(200).json({
            message: `User ${user.isActive ? "Activated" : "Disabled"} successfully`,
            success: true,
        })
    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const userSignUp = async (req, resp) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return resp.status(400).json({
                message: 'All fields are required!',
                success: false,
            })
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return resp.status(409).json({
                message: 'Email already exists!',
                success: false,
            })
        }

        const hashPass = await bcrypt.hash(password, 10);

        const signUp = await userModel.create({ name, email, password: hashPass })

        resp.status(201).json({
            message: 'SignUp successfully',
            success: true,
        })
    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const login = async (req, resp) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return resp.status(400).json({
                message: 'email & password must enter!',
                success: false,
            })
        }
        const emailCheck = await userModel.findOne({ email });

        if (!emailCheck) {
            return resp.status(401).json({
                message: 'Invalid email!',
                success: false,
            })
        }

        const passCom = await bcrypt.compare(password, emailCheck.password)

        if (!passCom) {
            return resp.status(401).json({
                message: 'Invalid password!',
                success: false,
            })
        }

        if (!emailCheck.isActive) {
            return resp.status(401).json({
                message: 'you are not approved you need contact admin',
                success: false
            })
        }

        const token = jwt.sign({ id: emailCheck._id, role: emailCheck.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        resp.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        })


        resp.status(200).json({
            message: 'Login successfully',
            success: true,
            role: emailCheck.role,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const addProduct = async (req, resp) => {
    try {

        const { name, price, stock, category, description } = req.body;
        if (!name || !price || !stock || !category) {
            return resp.status(400).json({
                message: 'All fields are required!',
                success: false,
            })
        }

        const product = await productModel.create({ name, price, stock, category, description, createdBy: req.user.id });

        resp.status(200).json({
            message: 'product added❤️',
            success: true,
        })
    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}


export const getAllProductForAdmin = async (req, resp)=>{
    try{
        if(req.user.role !== 'admin'){
            return resp.status(403).json({
                message: 'you can not access this page',
                success: false,
            })
        }
        const products = await productModel.find({isActive: true}).populate("createdBy", "name email");
        resp.status(200).json({
            success: true,
            products,
        })

    }catch(err){
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const userLogout = async (req, resp) => {
    try {

        resp.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        })

        resp.status(200).json({
            message: 'Logout successfully',
            success: true,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

export const productDelete = async (req, resp)=>{
    try {
        if(req.user.role !== 'admin'){
            return resp.status(403).json({
                message: 'Forbidden.'
            })
        }

        const id = req.params.id;
        const product = await productModel.findById(id);
        if(!product){
            return resp.status(404).json({
                message: 'Product not found',
                success: false,
            })
        }

        product.isActive = !product.isActive;

        await product.save();

        resp.status(200).json({
            message: 'Product hidden',
            success: true,
        })

    }catch(err){
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

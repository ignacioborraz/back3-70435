import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { usersManager } from "../dao/manager.mongo.js";
import { compareHash, createHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

passport.use(
  "register",
  new LocalStrategy(
    /* la configuración de la estrategia depende de QUE QUIERO HACER */
    /* en este caso quiero REGISTRAR */
    /* para construir una estrategia necesito configurar */
    /* objeto con opciones de configuracion y callback con la logica de la estrategia */
    {
      passReqToCallback: true,
      usernameField: "email" /* , passwordField: "contrasenia" */,
    },
    async (req, email, password, done) => {
      try {
        const one = await usersManager.readBy({ email });
        if (one) {
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
        }
        req.body.password = createHash(password)
        const user = await usersManager.createOne(req.body);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await usersManager.readBy({ email });
        if (!user) {
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
        }
        const verifyPassword = compareHash(password, user.password);
        if (!verifyPassword) {
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
        }
        const token = createToken({
          email: user.email,
          role: user.role,
          user_id: user._id,
        });
        req.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
  /* la configuración de la estrategia depende de QUE QUIERO HACER */
  /* en este caso quiero INICIAR SESION */
);
passport.use(
  "google",
  new GoogleStrategy(
    /* objeto de configuración de la estrategia */
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
      passReqToCallback: true,
    },
    /* callback done con la logica necesaria para la estrategia */
    async (req, accesToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.id });
        if (!user) {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            avatar: profile.photos[0].value,
            password: createHash(profile.id),
          };
          user = await User.createOne(user);
        }
        const token = createToken({
          email: user.email,
          role: user.role,
          user_id: user._id,
        });
        req.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "jwt-auth",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await User.findById(user_id);
        if (!user) {
          return done()
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "jwt-adm",
  new JwtStrategy(
    {
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id, role } = data;
        const user = await User.findById(user_id);
        if (user.role !== "ADMIN") {
          return done(null)
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;

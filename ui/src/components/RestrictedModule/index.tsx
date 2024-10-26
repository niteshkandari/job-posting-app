import { useEffect } from "react";
import Lottie from "react-lottie-player";
import { Box, Grid, Typography } from "@mui/material";

import ANIMATION_DATA from "./lottie.json";

interface Props {
  title: string;
}

const RestrictedModule = (props: Props) => {
  const { title } = props;

 
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        maxWidth: "100%",
        marginTop: { xs: "20px", md: "28px" },
        px: 2,
        minHeight: "90vh",
      }}
    >
      <Box sx={{ width: "100%", height: "55vh" }}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Lottie
              loop
              animationData={ANIMATION_DATA}
              play
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid item sm={12} md={6} sx={{ alignSelf: "center" }}>
            <Box>
              <Typography variant="h5">
                <b>Module </b>
                Restricted.
              </Typography>
              <Typography sx={{ color: "#555" }}>{title}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RestrictedModule;
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AIModel {
  id: number;
  model_id: string;
  name: string;
  short_desc: string;
  created_at: string;
  image: string;
  premium: boolean;
  ios_premium: boolean;
  popular: boolean;
  default: boolean;
  prompt_engineering: string | null;
  ad_type: string;
  delay: number;
  api_key: string;
  api_url: string;
  queue_url: string | null;
  api_key_location: string;
  provider: {
    samples: number;
    num_inference_steps: number;
    safety_checker: boolean;
    safety_checker_type: string;
    tomesd: string;
    use_karras_sigmas: string;
    multi_lingual: string;
    panorama: string;
    self_attention: string;
    upscale: number;
    clip_skip: number;
    highres_fix: string;
  };
  parameters: {
    prompt: string;
    negative_prompt: string;
    cfg_scale: string;
    aspect_ratio: string | null;
    width: string;
    height: string;
    model_id: string;
  };
}

interface InitialState {
  models: AIModel[];
  selectedModel: AIModel | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  models: [],
  selectedModel: null,
  isLoading: false,
  error: null,
};

// Async thunk for fetching AI models
export const fetchAIModels = createAsyncThunk(
  "aiModels/fetchAIModels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ai-models`
      );
      console.log({ asynthunkREposn: response.data });
      return response.data.aiModels;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const aiModelsSlice = createSlice({
  name: "aiModels",
  initialState,
  reducers: {
    selectModel: (state, action: PayloadAction<number>) => {
      state.selectedModel =
        state.models.find((model) => model.id === action.payload) || null;
    },
    resetSelectedModel: (state) => {
      state.selectedModel = null;
    },
    resetModels: (state) => {
      state.models = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIModels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAIModels.fulfilled, (state, action) => {
        state.models = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAIModels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectModel, resetSelectedModel, resetModels } =
  aiModelsSlice.actions;

export default aiModelsSlice.reducer;

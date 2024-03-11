export class Config {
    public imageHeight = 50;
    public imageWidth = 50;

    public shortName = 'c-training';

    public useGpuSkeletonizer = false;

    public env = process.env.NODE_ENV || 'development';
}
